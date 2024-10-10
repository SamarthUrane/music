    // Function to get pre-signed URL
    export const getPresignedUrl = async (file, fileType) => {
        console.log("PRESIDNGED URL GENRED"+file.name+fileType) 
        const response = await fetch(`http://localhost:3000/s3/upload-url?fileName=${encodeURIComponent(file.name)}&fileType=${fileType}`);
        const { url } = await response.json();
        return url;
    };

    // Function to upload file to S3 using the pre-signed URL
    export const uploadFileToS3 = async (file, presignedUrl) => {
        try {
            const response = await fetch(presignedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type,  // Ensure this matches 
                },
                body: file,
            });
    
            if (!response.ok) {
                throw new Error(`Failed to upload file: ${response.statusText}`);
            }
    
            console.log("File successfully uploaded to S3.");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    export const getUrl = async(fileName)=>{
        const response = await fetch(`http://localhost:3000/s3/get-url?fileName=${fileName}`);
        const {url}=await response.json();
        return url;
    }
    export const deleteUrl = async(fileName)=>{
        const response = await fetch(`http://localhost:3000/s3/delete-file?fileName=${fileName}`);
        const {url}=await response.json();
        return url;
    }