import { prisma } from "../lib/prisma"; 


export const createCategory = async(
    name: string,
    description: string,
) => {

    if(!name || !description){
        throw new Error("Both name and description are required");
    }

    const categoryDetails = await prisma.category.create({
        data: {
            name: name,
            description: description,
        }
    });

    return {
        message: "Category created successfully",
        data: categoryDetails.name,
    };
}

export const showAllCat = async() => {
    const result = await prisma.category.findMany({});

    if(!result){
        throw new Error("No category found");
    }

    return {
        data: result,
    };
}

