

export const convertSecondstoDuration = (seconds: number) : string => {

    if(!seconds || seconds <= 0){
        return "0h 0m 0s";
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
}