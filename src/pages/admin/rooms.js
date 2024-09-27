const Rooms = () =>{
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
                <p className="text-3xl font-bold">152</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                <p className="text-3xl font-bold">$24,500</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Occupancy Rate</h3>
                <p className="text-3xl font-bold">78%</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Guest Satisfaction</h3>
                <p className="text-3xl font-bold">4.7/5</p>
              </div>
            </div>
        </div>
    )
}

export default Rooms;