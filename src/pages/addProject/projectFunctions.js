import app, { database, storage,auth } from "../../api/firebase";


export const  addProjectToDB = ( values, clickCords, fileName) => {
    const owner = auth.currentUser.email;
    database.projects
      .add({
        name: values.name,
        description: values.description,
        clickCords,
      })
      .then(uploadFile(values.name,fileName,owner))
      .catch((e) => window.alert(`Erreur ${e}`));
  }

const uploadFile = (projectName,fileName,owner) =>{
    //test purpose, use the ID of the project owner to create separate spaces for each owner in cloud storage
    const cloudStorage = storage.ref();
    console.log(cloudStorage);
    const fileRef = cloudStorage.child(owner).child(projectName).child(fileName);
    fileRef
      .put(fileName)
      .then(() => console.log("added a file successfully"))
      .catch((e) => console.log("failed to add file : " + e));
  }
