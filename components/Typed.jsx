import Typed from 'react-typed';

export default function Footer(){

    return(
        <div className="py-5 font-bold" style={{height: '10vh'}}> 
        <Typed
         showCursor={false} 
         strings={['Welcome to accomodation','We link you up with house agents']} 
         typeSpeed={50}
         backSpeed={50}
        loop
        />
        </div>
    )
}