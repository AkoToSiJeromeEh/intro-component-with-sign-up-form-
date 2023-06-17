import IntroComp from '../components/IntroComponent'
import IntroData from '../data/SignUpData'
function MainIntro() {

  const IntroElements = IntroData.map(data => {
    return (
      <IntroComp
        key={data.id}
        {...data}
      />
    );
  });
  
        
  
  return (
    <div>
    {IntroElements}
    </div>
  )
}

export default MainIntro