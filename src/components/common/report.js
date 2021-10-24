export const ReportElement = ({ title, value, ...children }) => (
    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">{title}</dt>

        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {value}
        </dd>
    </div>
);

const Report = ({ data, title, comment }) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-bold text-gray-900">
                    {title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {comment}
                </p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    {data.map(([key, value]) => {
                        console.log(key);
                        return (
                            <ReportElement
                                key={key}
                                title={key}
                                value={value}
                            />
                        );
                    })}
                </dl>
            </div>
        </div>
    );
};

export default Report;
