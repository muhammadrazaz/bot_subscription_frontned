import React from 'react'
import { PieChart,Pie,ResponsiveContainer,Cell,Legend } from 'recharts';


export default function CustomPieChart(props) {
    

      const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.40;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className='font-8'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomizedLegend = ({ payload }) => {
   
    return (
      <div className='d-flex justify-content-around' style={{paddingTop:'5px'}}>
        {payload.map((entry, index) => (
         
          <span key={`legend-${index}`} style={{ color: entry.color, borderTop:'2px solid '+entry.color,maxWidth:'30%',overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'}} className='font-2 macan-regular'>
             {entry.payload.name + ' ' + entry.payload.value}
             

          </span>
        ))}
        </div>
     
    );
  };
  return (
   
    <div style={{height:'100%'}}>
      
                  <ResponsiveContainer>
                  <PieChart  >
                  

       
                    <Pie
                      data={props.data}
                     
                      cx='50%'
                      cy='55%'
                      labelLine={false}
                      label={renderCustomizedLabel}
                      innerRadius={0}
                      outerRadius='80%'
                      fill="#8884d8"
                     
                      
     
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {props.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={props.colors[index % props.colors.length]} />
                      ))}
                    </Pie>
                    <Legend  content={<CustomizedLegend />} verticalAlign="bottom" height={20}/>
                    

                  </PieChart>
                  </ResponsiveContainer>
                </div>
           
  )
}
