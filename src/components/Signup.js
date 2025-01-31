import { useState } from 'react';
import { signupFields } from "../constants"
import FormAction from "./FormAction";
import Input from "./Input";
import instance from '../utils/axios';

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
    
  }
  const user = {
    name: "Teste",
    lastName: "Test2",
    email: "e@email.com",
    password: "12345"
  }

  //handle Signup API Integration here
  const createAccount=()=>{
    instance.post('/api/user', {user}).then(
      res => {
        console.log(res);
      }
    )
    console.log("usuário criado com sucesso");

  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}