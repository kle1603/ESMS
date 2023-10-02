// AddRowModal.js
import { Form, Input, Modal } from "antd";

export const AddRowModal = ({ visible, handleOk, handleCancel, form }) => {
    return (
        <Modal
            title="Add a row"
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form} name="add_row_form">
                <Form.Item
                    name="slot"
                    rules={[
                        {
                            required: true,
                            message: "Please input the slot!",
                        },
                        {
                            pattern: /^Slot\s+/,
                            message: 'The slot must start with "Slot".',
                        },
                    ]}
                >
                    <Input placeholder="Slot" />
                </Form.Item>
                <Form.Item
                    name="startTime"
                    rules={[
                        {
                            required: true,
                            message: "Please input the start time!",
                        },
                        {
                            pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                            message:
                                "Please enter a valid time format (HH:mm)!",
                        },
                    ]}
                >
                    <Input placeholder="Start Time" />
                </Form.Item>
                <Form.Item
                    name="endTime"
                    rules={[
                        {
                            required: true,
                            message: "Please input the start time!",
                        },
                        {
                            pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                            message:
                                "Please enter a valid time format (HH:mm)!",
                        },
                    ]}
                >
                    <Input placeholder="End Time" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
