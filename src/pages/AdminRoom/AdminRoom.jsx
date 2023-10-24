import RoomTable from "@/components/Admin/RoomTable";
import { Divider } from "antd";

const AdminRoom = () => {
    return (
        <div>
            <Divider orientation="left">Room</Divider>
            <RoomTable/>
        </div>
    );
};

AdminRoom.propTypes = {};

export default AdminRoom;
