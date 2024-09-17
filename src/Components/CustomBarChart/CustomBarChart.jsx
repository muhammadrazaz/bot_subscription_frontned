import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';

import bestPerformer from '../../Assets/best-performer-icon.svg'

export default function CustomBarChart(props) {
  

  const CustomXAxisLabel = ({ x, y, payload }) => {
   
    let yGap = 0
    
  
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={5} textAnchor="middle" fill="#888"  style={{ whiteSpace: 'pre-line' }}>
          {
            
            
            payload.value.split(' ').map((data,index)=>{
              
              return <tspan key={index} textAnchor="middle" x="0" dy={yGap=yGap+8}>{data}</tspan>
            })
          }
        
        </text>
      </g>
    );
  };

  
  
  
  
  
  return (
    <div className='h-100'>
      <ResponsiveContainer> 
      <BarChart width={'100%'} height={'100%'} data={props.data}>
      <foreignObject x={0} y={0} height={'30px'} width={'100%'} >
          
        </foreignObject>
        
        <CartesianGrid strokeDasharray="3 3" verticalAlign="top" />
        <XAxis dataKey="name" className='font-2' tick={<CustomXAxisLabel/>}  interval={0}/>
        <YAxis  className='font-2' />
        <Tooltip cursor={{fill: 'transparent'}}/>
        <Legend  verticalAlign='top' align="right"  formatter={(value, entry, index) => <span className="font-2 macan-regular">{value}</span>}/>
        
        <Bar dataKey="crypto" fill="#F98925" barSize={10} verticalAlign="top" radius={10} />
        <Bar dataKey="paypal" fill="#232529" barSize={10} verticalAlign="top" radius={10} />
        <Bar dataKey="stripe" fill="#A51854" barSize={10} verticalAlign="top" radius={10} />
        

        
      
      </BarChart>
      </ResponsiveContainer>
    </div>   
    
  )
}
