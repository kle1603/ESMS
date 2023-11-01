import RoomTable from "@/components/Admin/RoomTable";
import { Divider } from "antd";

const AdminRoom = () => {
    return (
        <div>
            <Divider
                orientation="left"
                style={{
                    fontFamily: "Inter",
                    fontSize: "1.8rem",
                    marginBottom: "40px",
                }}
            >
                Room
            </Divider>
            <RoomTable />
        </div>
    );
};

AdminRoom.propTypes = {};

export default AdminRoom;
