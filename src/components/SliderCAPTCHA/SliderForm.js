import { Card } from 'react-bootstrap';
import { useSlider } from '../../context/SliderContext';

const SliderForm = () => {
  const { data } = useSlider();
  return (
    <>
      <Card className='m-5 shadow text-center' style={{ width: 340 }}>
        <Card.Header
          className='bg-primary'
          style={{ paddingTop: 3, paddingBottom: 3 }}
        ></Card.Header>
        <Card.Body>
          <Card.Text>Slide to complete the puzzle</Card.Text>
          <div
            className='mb-2'
            style={{ position: 'relative', width: 300, height: 200 }}
          >
            <img src={data.background_src} alt='' style={{}} />
            <img
              src={data.slice_src}
              alt=''
              style={{
                width: data.slice_css_attributes.width,
                height: data.slice_css_attributes.height,
                position: 'absolute',
                left: 0,
                top: +data.slice_css_attributes.top.replace('px', ''),
              }}
            />
          </div>
          <div className='mb-2'>Slider Placeholder</div>
          <Card.Text>{JSON.stringify(data.slice_css_attributes)}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default SliderForm;
