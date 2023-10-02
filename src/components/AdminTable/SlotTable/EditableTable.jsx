// EditableTable.js
import { Table, Form } from "antd";
import { EditableCell } from "./EditableCell";

export const EditableTable = ({
    columns,
    dataSource,
    form,
    editingKey,
    isEditing,
}) => {
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={dataSource}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    pageSize: 5,
                    hideOnSinglePage: dataSource.length <= 5,
                }}
            />
        </Form>
    );
};
