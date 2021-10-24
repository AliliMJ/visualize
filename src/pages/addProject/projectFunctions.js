import app, { database, storage,auth } from "../../api/firebase";

export const  addProjectToDB = ( user, values, cords, fileName, history) => {
    database.projects
      .add({
        owner:user.uid,
        title: values.name,
        description: values.description,
        cords,
        work: 0,
        collectors :[]
      })
      .then(p => uploadFile(values.name,fileName,user.uid)).then(()=>history.push("/dashboard"))
      .catch((e) => window.alert(`Erreur ${e}`));
  }

const uploadFile = (projectName,fileName,owner) =>{
    //test purpose, use the ID of the project owner to create separate spaces for each owner in cloud storage
    const cloudStorage = storage.ref();
    console.log(cloudStorage);
    const fileRef = cloudStorage.child(owner).child(projectName).child(fileName);
    return fileRef
      .put(fileName)
      
  }
