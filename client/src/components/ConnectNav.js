import { Card, Avatar } from 'antd';
import { formatDistance } from 'date-fns';
import { useSelector } from 'react-redux';

const ConnectNav = () => {

  const { Meta } = Card;
  const { authReducer } = useSelector((state) => ({ ...state }));
  const { user } = authReducer.data;
  const date = formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true });

  return (
    <div className="d-flex justify-content-around">
      <Card>
        {
          user && (
            <Meta
              avatar={ <Avatar>{ user.name ? user.name?.[0].toUpperCase() : user.email?.[0].toUpperCase() }</Avatar> }
              title={
                <>
                  <span>{ user.name }
                    <small><mark> { user.isActivated ? ' Account activated' : ' Account not activated' } </mark></small>
                  </span>
                  <div>
                    <small>{ user.email }</small>
                  </div>
                </>
              }
              description={ `Joined ${ date }` }
            />
          )
        }
      </Card>
    </div>
  );
};

export default ConnectNav;
