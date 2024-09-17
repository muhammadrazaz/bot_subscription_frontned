import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import bestPerformer from '../../Assets/best-performer-icon.svg'

export default function CustomLineChart(props) {
    const CustomTooltip = ({ active, payload, label }) => {
       
        if (active && payload && payload.length) {
          
       
    
          return (
            <div className="custom-tooltip p-2" style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.5)' }}>
              <p className="label m-0">{label}</p>
              {payload.map((entry) => (
                <p key={entry.dataKey} className="desc m-0 font-2" style={{ color: entry.color }}>
                  {`${entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}: ${parseInt(entry.value).toLocaleString()}`}
                </p>
                
              ))}
              {/* <p className="m-0 font-2" style={{ color: "#A51854" }}>Damage : {(parseInt(payload[0].payload.Damage).toLocaleString()).toLocaleString()}</p>
              <p className="m-0 font-2" style={{ color: "#008000" }}>Total Earning : {(parseInt(payload[0].payload.totalPrice).toLocaleString()).toLocaleString()}</p>
              <p className="m-0 font-2" style={{ color: "#FFA500" }}>Total Production : {(parseInt(payload[0].payload.Production).toLocaleString()).toLocaleString()}</p> */}
            </div>
          );
        }
        return null;
      };
    
    return (
       <div className='h-100'>
         <ResponsiveContainer>
            <LineChart width={'100%'} height={'100%'} data={props.data} >
            
            <CartesianGrid strokeDasharray="3 3"  />
            <XAxis dataKey="name" className='font-2'/>
            <YAxis className='font-2'/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend  verticalAlign='top' align="right" formatter={(value, entry, index) => <span className="font-2 macan-regular">{value}</span>}/>
            <Line type="monotone" dataKey="sale" stroke="#F98925"  strokeWidth={2}/>
            {/* <Line type="monotone" dataKey="Leftovers" stroke="#232529" strokeWidth={2}/> */}
        </LineChart>
        </ResponsiveContainer>
       </div>

    )
}
