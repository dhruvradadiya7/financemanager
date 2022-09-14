import { useEffect, useState } from "react";
import { ReactComponent as PlayIcon } from "icons/play.svg";
import { ReactComponent as PauseIcon } from "icons/pause.svg";
import getObj, { createNUpdateObj } from "utils/fetchfb";

const Users = () => {
  const [data, setData] = useState({});

  const getData = async () => {
    const result = await getObj("/users");
    setData(result);
    console.log(result);
  };

  const blockUser = (uid, userState) => {
    console.log(uid, !userState);
    createNUpdateObj("/users/" + uid + "/blocked", !userState);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="users_main-content-box fcss">
      <div className="frcb users_main-content_header">
        <h3>Users</h3>
      </div>
      <div className="exe_main-content_table fcss">
        <div className="exe_main-content_table-row-header frss">
          <div className="exe_main-content_table-col fccs col-1">
            <p>#</p>
          </div>
          <div className="exe_main-content_table-col fccs col-2">
            <p>Name</p>
          </div>
          <div className="exe_main-content_table-col fccs col-2">
            <p>Email</p>
          </div>
          <div className="exe_main-content_table-col fccs col-1">
            <p>Action</p>
          </div>
        </div>

        {Object.entries(data).map(([id, user], index) => (
          <div className={`exe_main-content_table-row frss`} key={id}>
            <div className="exe_main-content_table-col fccs col-1">
              <p>{index + 1}</p>
            </div>
            <div className="exe_main-content_table-col fccs col-2">
              <p>{user.name}</p>
            </div>
            <div className="exe_main-content_table-col fccs col-2">
              <p>{user.email}</p>
            </div>
            <div className="exe_main-content_table-col fccs col-1">
              <button className={`exe_main-content-btn ${user.blocked? 'notblocked' : 'blocked'}`} onClick={() => blockUser(id, user.blocked)}>
                 {user.blocked ? <PauseIcon className="exe_main-content-btn-icon"/> : <PlayIcon className="exe_main-content-btn-icon"/> } 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
