import React from 'react';

// A simple BOQ (Bill of Quantities) component that receives areas (counts),
// areaValues (sqft per item), and a priceMap (price per sqft or per unit) to
// compute itemized costs and a grand total.
const defaultPriceMap = {
  linear: 1500, // per sq ft estimate
  lType: 1200,
  md: 1400,
  manager: 1600,
  small: 1200,
  ups: 800,
  bms: 800,
  server: 1000,
  reception: 1500,
  lounge: 1200,
  sales: 1200,
  phoneBooth: 2000, // per booth
  discussionRoom: 1300,
  interviewRoom: 1300,
  conferenceRoom: 1400,
  boardRoom: 1500,
  meetingRoom: 1300,
  meetingRoomLarge: 1300,
  hrRoom: 1200,
  financeRoom: 1400,
  breakoutRoom: 1100,
  executiveWashroom: 1000,
  videoRecordingRoom: 1600,
  other: 1000,
};

const formatCurrency = (v) =>
  v.toLocaleString(undefined, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

const BOQ = ({ areas = {}, areaValues = {}, totalArea = 0, priceMap = {} , onClose}) => {
  const pm = { ...defaultPriceMap, ...priceMap };

  // Build items array
  const items = Object.keys(areas).map((key) => {
    const count = Number(areas[key]) || 0;
    const unitArea = Number(areaValues[key]) || 0;
    // For items like phoneBooth, priceMap is per unit; others assume per sqft
    const perUnitPrice = pm[key] || 0;

    // Decide whether to price by unit (count * perUnitPrice) or by area
    // We'll assume: if unitArea > 0 use area-based price (area * perUnitPrice),
    // else (unitArea == 0) use per-unit pricing.
    const area = count * unitArea;
    const amount = unitArea > 0 ? Math.round(area * perUnitPrice) : Math.round(count * perUnitPrice);

    return {
      key,
      label: key,
      count,
      unitArea,
      area,
      perUnitPrice,
      amount,
    };
  }).filter(i => i.count > 0);

  const grandTotal = items.reduce((s, it) => s + it.amount, 0);

  return (
    <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      <h2 style={{marginTop:0}}>Bill of Quantities</h2>
      <div style={{marginBottom:8}}>Total Area: {totalArea} sq ft</div>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead>
          <tr>
            <th style={{textAlign:'left',borderBottom:'1px solid #ddd',padding:'8px'}}>Item</th>
            <th style={{textAlign:'right',borderBottom:'1px solid #ddd',padding:'8px'}}>Count</th>
            <th style={{textAlign:'right',borderBottom:'1px solid #ddd',padding:'8px'}}>Unit Area (sqft)</th>
            <th style={{textAlign:'right',borderBottom:'1px solid #ddd',padding:'8px'}}>Total Area (sqft)</th>
            <th style={{textAlign:'right',borderBottom:'1px solid #ddd',padding:'8px'}}>Unit Price</th>
            <th style={{textAlign:'right',borderBottom:'1px solid #ddd',padding:'8px'}}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.key}>
              <td style={{padding:'8px',textTransform:'capitalize'}}>{it.label}</td>
              <td style={{padding:'8px',textAlign:'right'}}>{it.count}</td>
              <td style={{padding:'8px',textAlign:'right'}}>{it.unitArea || '-'}</td>
              <td style={{padding:'8px',textAlign:'right'}}>{it.area || '-'}</td>
              <td style={{padding:'8px',textAlign:'right'}}>{it.unitArea>0 ? formatCurrency(it.perUnitPrice) + '/sqft' : formatCurrency(it.perUnitPrice) + '/unit'}</td>
              <td style={{padding:'8px',textAlign:'right'}}>{formatCurrency(it.amount)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} style={{padding:'8px',fontWeight:'700',textAlign:'right',borderTop:'1px solid #ddd'}}>Grand Total</td>
            <td style={{padding:'8px',fontWeight:'700',textAlign:'right',borderTop:'1px solid #ddd'}}>{formatCurrency(grandTotal)}</td>
          </tr>
        </tbody>
      </table>
      <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:12}}>
        <button onClick={onClose} style={{padding:'8px 12px'}}>Close</button>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({totalArea, items, grandTotal}, null, 2))}`}
          download={`boq_${Date.now()}.json`}
          style={{padding:'8px 12px',background:'#003366',color:'#fff',textDecoration:'none',borderRadius:4}}
        >Download JSON</a>
      </div>
    </div>
  );
};

export default BOQ;
