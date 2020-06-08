import React, { Component } from "react";
import "./App.css";
 
const API_ROOT_URL = process.env.API_ROOT_URL || "http://localhost:3002";
 
class App extends Component {
 constructor(props) {
   super(props);
   this.state = {
     uploading: false,
     photo: null,
     name: "",
   };
 
   this.handleChange = this.handleChange.bind(this);
 }
 
 handleChange(e) {
   this.setState({ name: e.target.value });
 }
 
 onChange = (e) => {
   this.setState({
     photo: e.target.files[0],
   });
 };
 
 onSubmit = async (e) => {
   e.preventDefault();
 
   const { photo, name } = this.state;
 
   this.setState({ uploading: true });
 
   const formData = new FormData();
   formData.append("photo", photo, name);
 
   try {
     fetch(`${API_ROOT_URL}/images`, {
       method: "POST",
       body: formData,
     }).then((res) => res.json());
     this.setState({
       uploading: false,
       file: null,
       name: "",
     });
   } catch (error) {
     console.log(error);
   }
 };
 
 render() {
   const { uploading, photo, name } = this.state;
 
   if (uploading) return <h1>Loading component would go here</h1>;
 
   return (
     <div className="App">
       <div className="App-container">
         <h1>Image Uploading App</h1>
         <form className="App-form" onSubmit={this.onSubmit}>
           <input
             type="file"
             name="file"
             id="photo"
             className="App-photo-btn"
             onChange={this.onChange}
           />
           <label for="photo">Välj bild att ladda upp</label>
 
           <label for="name">Vänligen namnge bild: </label>
           <input
             type="text"
             id="name"
             value={name}
             className="App-name-input"
             onChange={this.handleChange}
           />
 
           <button
             type="submit"
             disabled={!name || !photo}
             className="App-submit-btn"
           >
             Ladda upp
           </button>
         </form>
       </div>
     </div>
   );
 }
}
 
export default App;