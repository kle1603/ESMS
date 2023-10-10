// import PropTypes from "prop-types";
import { useState } from 'react';
import * as St from './StaffTest.styled.js'
import { Button, Form, Modal, Table } from "antd";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>
    },

    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },

    {
        title: 'Room',
        dataIndex: 'room',
        key: 'room',
    },

    {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete'
    }
];

const data = [
    {
        key: '1',
        name: 'Ngoc Anh',
        time: '10 A.M',
        room: '1004',
    },

    {
        key: '2',
        name: 'Lachimolala',
        time: '3 A.M',
        room: '1410',
    }
]


const StaffTestNaNe = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return (
        <St.Test>
            
            <St.ButtonTable>
                <Button onClick={showModal}>Add row</Button>

                <Modal 
                title="Add information"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                > 
                    <Form
                        name='wrap'
                        labelCol={{
                            flex: '110px'
                        }}
                        labelAlign='left'
                        labelWrap
                        w
                        ></Form>
                </Modal>
            </St.ButtonTable>

            <Table columns={columns} dataSource={data}></Table>
        </St.Test>
    )
};

StaffTestNaNe.propTypes = {};

export default StaffTestNaNe;
