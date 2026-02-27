import { prisma } from "../lib/prisma"; 
import { convertSecondstoDuration } from "../utils/convertSectoDuration";

export const updateProfileService = async(
    userId: string,
    data: {
        firstName?: string;
        lastName?: string;
        dateOfBirth?: string;
        about?: string;
        contactNumber?: string;
        gender?: string;
    }
) => {
    await prisma.user.update({
        where: { id: userId },
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
        },
    });

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { profileId: true },
    });

    const profileId = user?.profileId ?? undefined;
    if (profileId === undefined) {
        throw new Error("User has no profile");
    }

    await prisma.profile.update({
        where: { id: profileId },
        data: {
            dateOfBirth: data.dateOfBirth,
            about: data.about,
            contactNumber: data.contactNumber,
            gender: data.gender,
        },
    });

    return prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true },
    });
}

export const deleteAccountService = async(
    userId: string,
): Promise<{ message: string }> => {

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include:{
            enrolledCourses: true,
            courses: true,
        },
    });

    if(!user){
        throw new Error("User not found");
    }

    await prisma.$transaction(async (tx) => {

        for(const course of user.enrolledCourses){
            await tx.course.update({
                where: { id: course.id },
                data: {
                    studentsEnrolled:{
                        disconnect: { id: user.id },
                    },
                },
            });
        }


        if(user.accountType === "Instructor"){
            await tx.course.deleteMany({
                where: { instructorId: userId },
            });
        }

        await tx.courseProgress.deleteMany({
            where: { userId },
        });

        if (user.profileId != null) {
            await tx.profile.delete({
                where: { id: user.profileId },
            });
        }

        await tx.user.delete({
            where: { id: userId },
        });
    });

    return { message: "Account deleted successfully" };
}

export const getAllUserDetailsService = async (
    userId: string,
) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            profile: true,
            enrolledCourses: true,
            courses: true,
        }
    });

    if(!user){
        throw new Error("User not found");
    }

    return user;
}

export const getEnrolledCourses = async(userId: string) => {
    
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            enrolledCourses: {
                include: {
                    courseContent: {
                        include: {
                            subSection: true,
                        },
                    },
                },
            },
            courseProgress:{
                include: {
                    completedVideos: true,
                },
            },
        },
    });

    if(!user){
        throw new Error("User not found");
    }

    const result = user.enrolledCourses.map((course) => {
        let totalDurationInSeconds = 0;
        let totalSubSections = 0;

        //calc dur + total videos
        for(const section of course.courseContent){
            for(const sub of section.subSection){
                totalDurationInSeconds += Number(sub.timeDuration || 0)
                totalSubSections += 1;
            }
        }

        //find progress for the course...
        const progress = user.courseProgress.find((p) => p.courseId === course.id);

        const completedVideosCount = progress?.completedVideos.length || 0;

        const progressPercentage = totalSubSections === 0 ? 100 : Math.round(
            ( completedVideosCount / totalSubSections ) * 10000
        ) / 100;

        return {
            ...course,
            totalDuration: convertSecondstoDuration(totalDurationInSeconds),
            progressPercentage
        };
    });

    return result;
}

export const instructorDashboard = async (
  instructorId: string
) => {

  const courses = await prisma.course.findMany({
    where: { instructorId },
    include: {
      studentsEnrolled: true,
    },
  });

  const formattedCourses = courses.map((course) => {

    const totalStudentsEnrolled =
      course.studentsEnrolled.length;

    const totalAmountGenerated =
      (course.price ?? 0) * totalStudentsEnrolled;

    return {
      id: course.id,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      price: course.price,
      totalStudentsEnrolled,
      totalAmountGenerated,
      createdAt: course.createdAt,
    };
  });

  return formattedCourses;
};