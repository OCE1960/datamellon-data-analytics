import React from "react";
import { Outlet} from "react-router-dom";
import { useAppDispatch } from "../state-management/hooks";
import { store } from "../state-management/features/salesDataSlice";
import { Link } from "react-router-dom";

function Container(){

    const dispatch = useAppDispatch();

    const handlePostRequest = async () => {
      const data = { "angular_test": "angular-developer" }
      const apiResponse = await dispatch(store(data)).unwrap();
      console.log(apiResponse);
       
  }
    
      return (
        
        <div className="flex flex-row flex-wrap ">
            <div className="w-1/6 flex-auto min-h-screen  bg-gray-200 p-4">
                <button type="button" className="btn mt-2" onClick={() => handlePostRequest()} >
                    Make a Post Request
                </button> <br/>
                <Link to="/" className="btn mt-2"> Home </Link>
                <br/>
                <Link to="sales" className="btn mt-2"> Sales Table </Link>
            </div>
            <div className="w-5/6 flex-auto min-h-screen  p-4">
                <Outlet />
            </div>

        </div>
      );
    }
  
  export default Container; 