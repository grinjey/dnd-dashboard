import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import SplitButton from 'react-bootstrap/SplitButton';
import { useState, useEffect } from 'react';

const Timer = ({onSubmit, char}) => {
    const [seconds, setSeconds] = useState(char.round_time ? char.round_time : 0);
    const [isActive, setIsActive] = useState(false);
  
    function toggle() {
      setIsActive(!isActive);
    }
  
    function reset() {
      setSeconds(char.round_time ? char.round_time : 0);
      setIsActive(false);
    }
    
    function submitTime() {
        if (seconds !== 0) {
            onSubmit({seconds})
        }
        
    }

    function clearTime() {
        setSeconds(0)
        onSubmit({seconds: 0})
    }

    useEffect(() => {
      let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, seconds]);

    useEffect(() => {
      reset();
    }, [char]
    )
  
    return (
        <div className="d-flex flex-row align-items-center">
            <div className="pe-4"> {seconds === char.round_time ? char.round_time : seconds} </div>
            <div className="d-flex flex-column ms-auto">
                <Button size="sm" className="mb-1" variant="success" onClick={toggle}>{isActive ? 'Pause' : 'Start'}</Button>
                <Button size="sm" className="mb-1" variant="warning" onClick={reset}>Reset</Button>
                <SplitButton
                    variant="dark"
                    title="Submit"
                    onClick={submitTime}
                    size={"sm"}
                    className="bg-dark"
                    >
                    <Dropdown.Item className="text-center" eventKey="1" onClick={clearTime}>Clear</Dropdown.Item>
                </SplitButton>
                
            </div>
        </div>
        

// className="h-25"

    //   <div className="app">
    //     <div className="time">
    //       {seconds}s
    //     </div>
    //     <div className="row">
    //       <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
    //         
    //       </button>
    //       <button className="button" onClick={reset}>
    //         Reset
    //       </button>
    //     </div>
    //   </div>
    );
  };
  
  export default Timer;