// dans
//Import Mongoose and Model
const mongoose = require("mongoose");
const Dans = require("../../server/models/dansModel");

// Define Dashboard component
const Account= () => {
  // State to store fetched data
  const [dansData, setDansData] = useState([]);

  // Function to fetch data from the database
  const fetchData = async () => {
    try {
      // Query data from the database
      const data = await Dans.find();

      // Update state with fetched data
      setDansData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {/* Render data */}
        {dansData.map((dans) => (
          <div key={dans._id}>
            <h2>Name: {dans.name}</h2>
            <p>Turul ID: {dans.turul_id}</p>
            <p>Uldegdel: {dans.uldegdel}</p>
            <p>Tailbar: {dans.tailbar}</p>
            <p>Account Status: {dans.accountStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;
