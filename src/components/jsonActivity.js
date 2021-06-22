import ReactJson from 'react-json-view';
import classNames from 'classnames';
const JsonActivity = ({ name, className, src, children, ...props }) => {
    return (
        <div className={classNames('shadow rounded border', className)}>
            <div className="h-12 shadow border-gray-200 bg-gray-50 text-gray-500  flex items-center px-5 font-bold">
                {name}
            </div>
            <div className="px-5 py-3">
                <ReactJson
                    name={false}
                    src={src}
                    displayObjectSize={false}
                    displayDataTypes={false}
                    enableClipboard={false}
                    iconStyle="circle"
                    {...props}
                />
            </div>
            {children}
        </div>
    );
};

export default JsonActivity;
