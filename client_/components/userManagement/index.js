import nodes from '../../utils/sampleData';

const UserManagement = () => {
    return (
        <div className="w-full h-[800px] flex flex-col items-start rounded overflow-y-auto border-2 border-black px-2">
            <button>Add User</button>
            <div className=' mx-auto w-full'>
                {/* <CompactTable columns={COLUMNS} data={data} theme={theme} pagination={pagination} /> */}
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 w-full">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                            ID
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                            Edit
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">

                    {nodes && nodes.map(item => {
                        return <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {item.id}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {item.name}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {String(item.deadline)}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {item.type}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {item.isComplete}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {item.nodes}
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default UserManagement;