$(document).ready(function() {


  
  function getAdjustedPlanetSize(planetSize) {
    var newSize = planetSize / 10000 / 7;
    return newSize;
  };
  
  function getAdjustedPlanetRotation(planetRotation){
    return planetRotation*400;
  }
  /*** END PLANET SIZE CALCULATOR ***/

  /*** START IMAGE SIZE CALCULATOR ***/
  var radius = .4;
  var theta = 14.896;
  var circumference = 2 * Math.PI * radius;
  var width = circumference * (theta / 360);
  var ratio = 800 / 800;
  var height = width * ratio;

  var givenHeight = .45;
  var unknownTheta = givenHeight / (2 * Math.PI * radius * ratio) * 360;

  console.log('Height: ' + height);
  console.log('Theta: ' + unknownTheta);
  /*** END IMAGE SIZE CALCULATOR ***/

  var planets = {
    'mercury': {
      'rotationSpeed': getAdjustedPlanetRotation(1408),
      'size': getAdjustedPlanetSize(1516),
      'texture': '#mercuryTexture',
      'title':'#mercuryTitle',
      'desc':'#mercuryDescImg'
      
    },
    'venus': {
      'rotationSpeed': getAdjustedPlanetRotation(5832),
      'size': getAdjustedPlanetSize(3761),
      'texture': '#venusTexture',
      'title':'#venusTitle',
      'desc':'#venusDescImg'
    },
    'earth': {
      'rotationSpeed': getAdjustedPlanetRotation(24),
      'size': getAdjustedPlanetSize(3956),
      'texture': '#earthTexture',
      'title':'#earthTitle',
      'desc':'#earthDescImg'
    },
    'mars': {
      'rotationSpeed': getAdjustedPlanetRotation(25),
      'size': getAdjustedPlanetSize(2460),
      'texture': '#marsTexture',
      'title':'#marsTitle',
      'desc':'#marsDescImg'
    },
    'jupiter': {
      'rotationSpeed': getAdjustedPlanetRotation(10),
      'size': getAdjustedPlanetSize(43441),
      'texture': '#jupiterTexture',
      'title':'#jupiterTitle',
      'desc':'#jupiterDescImg'
    },
    'saturn': {
      'rotationSpeed': getAdjustedPlanetRotation(11),
      'size': getAdjustedPlanetSize(36184),
      'texture': '#saturnTexture',
      'title':'#saturnTitle',
      'desc':'#saturnDescImg'
    },
    'uranus': {
      'rotationSpeed': getAdjustedPlanetRotation(17),
      'size': getAdjustedPlanetSize(15759),
      'texture': '#uranusTexture',
      'title':'#uranusTitle',
      'desc':'#uranusDescImg'
    },
    'neptune': {
      'rotationSpeed': getAdjustedPlanetRotation(16),
      'size': getAdjustedPlanetSize(15299),
      'texture': '#neptuneTexture',
      'title':'#neptuneTitle',
      'desc':'#neptuneDescImg'
    },
    'moon':{
      'rotationSpeed': getAdjustedPlanetRotation(27.3),
      'size': getAdjustedPlanetSize(1079),
      'texture':'#moonTexture',
      'title':''
      
    }
  };
  var planetIDArr = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  var currPlanetIndex = 2;
  var currPlanet = planetIDArr[currPlanetIndex];
  var maintainSizeRatio = false;
  var maintainRotationSpeed = false;
  
  function decrementPlanetIndex() {
    if (currPlanetIndex == 0) {
      currPlanetIndex = 7;
    } else {
      currPlanetIndex -= 1;
    }
  };

  function incrementPlanetIndex() {
    if (currPlanetIndex == 7) {
      currPlanetIndex = 0;
    } else {
      currPlanetIndex += 1;
    }
  };

  function setCurrPlanet() {
    currPlanet = planetIDArr[currPlanetIndex];
  };

  function setCurrTexture() {
    $('.colorTransition').remove();
    $('#planetSphere').append("<a-animation class='colorTransition' attribute='color' from='white' to='black' dur='750'></a-animation>");
    setTimeout(function() {
      $('#planetSphere').attr('src', planets[currPlanet].texture);
      $('#planetSphere').append("<a-animation class='colorTransition' attribute='color' from='black' to='white' dur='750'></a-animation>");
    }, 500);
  };
  
  
  function setCurrDesc(){
    $('.descTransition').remove();
    $('#description').append("<a-animation class='descTransition' attribute='color' from='white' to='black' dur='750'></a-animation>");
    setTimeout(function() {
      $('#description').attr('src', planets[currPlanet].desc);
      $('#description').append("<a-animation class='descTransition' attribute='color' from='black' to='white' dur='750'></a-animation>");
    }, 500);
  }
  
  
  
  function setCurrSize() {
    $('.sizeTransition').remove();
    if(maintainSizeRatio == false){
       $('#planetSphere').append("<a-animation class='sizeTransition' attribute='radius' to='.3' dur='750'></a-animation>");
    }else{
      $('#planetSphere').append("<a-animation class='sizeTransition' attribute='radius' to='" + planets[currPlanet].size + "' dur='750'></a-animation>");
    }
  }
  
  function setText() {
    $('.titleTransition').remove();
    $('#planetTitle').append("<a-animation class='titleTransition' attribute='color' from='white' to='black' dur='750'></a-animation>");
    setTimeout(function() {
      $('#planetTitle').attr('src', planets[currPlanet].title);
      $('#planetTitle').append("<a-animation class='colorTransition' attribute='color' from='black' to='white' dur='750'></a-animation>");
    }, 500);
  };
  
  $('#prevButton').click(function() {
    if(currPlanet == 'earth'){
      hideMoon();
    }else if(currPlanet == 'saturn'){
      hideRings();
    }
    decrementPlanetIndex();
    setCurrPlanet();
    
    if(currPlanet == 'earth'){
      showMoon();
    }else if(currPlanet == 'saturn'){
      showRings();
    }
    setCurrTexture();
    setText();
    setCurrDesc()
    
    if(maintainSizeRatio){
      setCurrSize();
    }
    
    if(maintainRotationSpeed){
      setRotationalSpeed();
    }
  });
  
  $('#nextButton').click(function() {
    if(currPlanet == 'earth'){
      hideMoon();
    }
    
    if(currPlanet == 'saturn'){
      hideRings();
    }
    
    setCurrDesc()
    incrementPlanetIndex();
    setCurrPlanet();
    
    
    if(currPlanet == 'earth'){
      showMoon();
    }
    if(currPlanet == 'saturn'){
      showRings();
    }
    
    setCurrTexture();
    setText();
    
    if(maintainSizeRatio){
      setCurrSize();
    }

    if(maintainRotationSpeed){
      setRotationalSpeed();
    }
  })

  $('#sizeOn').click(function() {
    maintainSizeRatio = true;
    setCurrSize();
    setMoonSize();
    toggleColor('#sizeOn', '#sizeOff');
  });
  
  $('#sizeOff').click(function() {
    maintainSizeRatio = false;
    setCurrSize();
    setMoonSize();
    toggleColor('#sizeOff', '#sizeOn');
  });
  
  $('#rotationOn').click(function(){
    maintainRotationSpeed = true;
    setRotationalSpeed();
    toggleColor('#rotationOn', '#rotationOff');
  });
  
  $('#rotationOff').click(function(){
    maintainRotationSpeed = false;
    setRotationalSpeed();
    toggleColor('#rotationOff', '#rotationOn');
  });
  
  function setRotationalSpeed() {
    //$('.rotationTransition').remove();
    
    /*if(maintainRotationSpeed){
      $('#planetSphere').append("<a-animation class='rotationTransition' attribute='rotation' to='0 360 0' direction='normal' dur='15000' easing='linear' fill='forwards' repeat='indefinite'> </a-animation>");
    }*/
    
    $('.colorTransition').remove();
    $('#planetSphere').append("<a-animation class='colorTransition' attribute='color' from='white' to='black' dur='750'></a-animation>");
    if(maintainRotationSpeed){
      setTimeout(function(){
        //console.log('hello');
        $('.rotationTransition').attr('dur', planets[currPlanet].rotationSpeed);
        $('#planetSphere').append("<a-animation class='colorTransition' attribute='color' from='black' to='white' dur='750'></a-animation>");
      }, 500);
    }else{
      setTimeout(function(){
        //console.log('hello');
        $('.rotationTransition').attr('dur', '10000');
        $('#planetSphere').append("<a-animation class='colorTransition' attribute='color' from='black' to='white' dur='750'></a-animation>");
      }, 500);
    }
    
  };
  
  function toggleColor(switchOn, switchOff){
    $(switchOn).attr('color', 'white');
    $(switchOff).attr('color', 'grey');
  };
  
  function showMoon(){
    $('.opacityTransition').remove();
    $('#moonSphere').append("<a-animation class='opacityTransition' attribute='opacity' from='0' to='1' dur='750'></a-animation>");
  };
  
  function hideMoon(){
    $('.opacityTransition').remove();
    $('#moonSphere').append("<a-animation class='opacityTransition' attribute='opacity' from='1' to='0' dur='750'></a-animation>");
  }; 
  
  function showRings(){
    $('.opacityRingTransition').remove();
    $('#saturnRings').append("<a-animation class='opacityRingTransition' attribute='opacity' from='0' to='1' dur='750'></a-animation>");
  };
  
  function hideRings(){
    $('.opacityRingTransition').remove();
    $('#saturnRings').append("<a-animation class='opacityRingTransition' attribute='opacity' from='1' to='0' dur='750'></a-animation>");
  };
  
  
  
  
  
  
  
  function setMoonSize(){
    $('.moonsizeTransition').remove();
    if(maintainSizeRatio == false){
       $('#moonSphere').append("<a-animation class='sizeTransition' attribute='radius' to='.05395' dur='750'></a-animation>");
    }else{
      $('#moonSphere').append("<a-animation class='sizeTransition' attribute='radius' to='" + planets['moon'].size + "' dur='750'></a-animation>");
    }
  };
  
  
});