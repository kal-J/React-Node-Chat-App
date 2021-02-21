import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { AppContext } from '../../context';
import moment from 'moment';
import { connectToSocketIO } from '../../socket.io';
import './style.scss';

const MembersList = () => {
  const { state, setState } = useContext(AppContext);
  const isAuthenticated = state.user.isAuthenticated;
  const members = state.members || [];

  useEffect(() => {
    // Join socket.io rooms here
    if (isAuthenticated) {
      connectToSocketIO(state, setState);
    }
  }, [isAuthenticated]);

  return (
    <>
    <div className="container">
        <div className="row d-flex justify-content-center my-2">
            <h3>MEMBERS</h3>
        </div>
    </div>
      {members.length ? (
        members.map((member) => {
          return (
            <div className="container d-flex justify-content-center">
              <Link
                key={member.email}
                to="/members/1"
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <div className="row mt-2">
                  <div className="d-flex chat">
                    <div className="col-2 d-flex flex-column justify-content-center ">
                      <div className="avatar"></div>
                    </div>
                    <div className="col-10">
                      <div className="d-flex justify-content-between col-12 mt-2">
                        <div>
                          {member.username.length > 10
                            ? `${member.username.substring(0, 10)}...`
                            : member.username}
                        </div>
                        <div>
                          Joined on :{' '}
                          {moment
                            .utc(new Date(member.createdAt).toISOString())
                            .local()
                            .format('YYYY-MM-DD')}
                        </div>
                      </div>
                      <div className="col-12 mt-2 d-flex flex-row-reverse">
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                        >
                          MESSAGE
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <div className="row d-flex justify-content-center">
          No one has joined this App yet.
        </div>
      )}
    </>
  );
};

export default MembersList;
