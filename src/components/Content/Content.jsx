import "./Content.css"
import { useEffect, useState } from "react";
import { Input, Button } from 'antd';
function Content(props) {
    const [val, setVal] = useState('')
    useEffect(() => {
        setVal(props.curLabel)
    }, [props.curLabel])
    const inputChange = (e) => {
        setVal(e.target.value)
    }
    const btnClick = () => {
        props.changeItems(val)
    }
    return (
        <div className="content">
            <Input value={val} onChange={inputChange} />
            <Button type="primary" onClick={btnClick}>保存</Button>
        </div>
    );
}

export default Content;