import {
  Lucide,
  Tippy,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import useTokenVerification from "../../hooks/useTokenVerification";
import { useNavigate } from "react-router-dom";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);


  const [users, setUsers]= useState([]);

  const {isVerified, verificationResult} = useTokenVerification();
  const navigate = useNavigate();


  useEffect(()=> {
    if(isVerified && !verificationResult.user.isAdmin){
          navigate('/notFound');
      }
  }, [isVerified])



  //activate or desactivate users
  const onChangeActive = async (e, userId)=> {
        const token = localStorage.getItem("userData") || null;

        if (!token) {
          console.error('No token found');
          return;
        }
        const isActive = e.target.checked;
        try {
            if(isActive){
                  await axios.put(`http://localhost:8000/api/users/activate/${userId}`, null, {
                    headers: {
                      'authorization': `Bearer ${token}`
                    }
                  });
                  e.target.checked = true;
            }else{
                  await axios.put(`http://localhost:8000/api/users/desactivate/${userId}`, null, {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  });
                  e.target.checked = false;
            }
        } catch (error) {
            console.log(`Error1 : ${error.response ? error.response : error}`);
        }
  }



  const fetchUsers = async ()=> {
    const token = localStorage.getItem('userData') || null;
    try {
      if(token){
        const allUsers = await axios.get('http://localhost:8000/api/users/profile', {
                            headers: {
                              'authorization': `Bearer ${token}`
                            }
                        })
        setUsers([...allUsers.data]);
      }
      else {
        console.log("you dont have access");
      }

    }catch(e){

    }
  }



  useEffect(()=> {
    fetchUsers();
  }, [])

  return (
    isVerified && <>
      <h2 className="intro-y text-lg font-medium mt-10">User List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <div className="hidden md:block mx-auto text-slate-500">
            Showing 1 to 10 of 150 entries
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List -*/}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">Full Name</th>
                <th className="text-center whitespace-nowrap">Active</th>
                <th className="text-center whitespace-nowrap">Role</th>
                <th className="text-center whitespace-nowrap">status</th>
                <th className="text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((usr, usrKey) => (
                <tr key={usrKey} className="intro-x">
                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      {usr.fullname}
                    </a>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {usr.email}
                    </div>
                  </td>
                  <td className="text-center">
                      <label className="inline-flex items-center mb-5 cursor-pointer">
                        <input type="checkbox" 
                            onChange={(e)=> {onChangeActive(e, usr._id)}}
                            className="sr-only peer" 
                            checked = {usr.active}/>
                        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                  </td>
                  <td className="text-center">{usr.isAdmin? "Admin" : "simple user"}</td>
                  <td className="w-40">
                    <div
                      className={classnames({
                        "flex items-center justify-center": true,
                        "text-success": usr.isAccountVerified,
                        "text-danger": !usr.isAccountVerified,
                      })}
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      {usr.isAccountVerified ? "Verified" : "not verified"}
                    </div>
                  </td>
                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                      <a className="flex items-center mr-3" href="#">
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                        Edit
                      </a>
                      <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={() => {
                          setDeleteConfirmationModal(true);
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* END: Data List -*/}
        {/* BEGIN: Pagination -*/}
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </nav>
          <select className="w-20 form-select box mt-3 sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div>
        {/* END: Pagination -*/}
      </div>
      {/* BEGIN: Delete Confirmation Modal -*/}
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Are you sure?</div>
            <div className="text-slate-500 mt-2">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger w-24">
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal -*/}
    </>
  );
}

export default Main;
