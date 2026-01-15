import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const settings = {
  width: 200,
  height: 200,
  value: 60,
};

function RequestCreate() {
  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#63D3F8',
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
  );
}

export default RequestCreate