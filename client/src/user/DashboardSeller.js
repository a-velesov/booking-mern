import DashboardNav from '../components/DashboardNav';

const DashboardSeller = () => {
  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <h1>Dashboard</h1>
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      <div className="container">
        <p>
          Show all hotels user have posted and a button to add new
        </p>
      </div>
    </>
  )
};

export default DashboardSeller;