let dataCaptcha = ""
  let verifyCallback = function(response) {
    document.getElementById('g-recaptcha-error').innerHTML = '';
  };

  function submitForm(){
    let form = document.querySelector('form');
    let dataObj = Object.fromEntries(new FormData(form).entries());
    
    let captcha = grecaptcha.getResponse();
    if(!captcha){
      document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">Debes validar el captcha para enviar tu información.</span>';
    }else{
      let payload = {
        data:
          {
            nombre:dataObj.nombre,
            email:dataObj.email,
            mensaje:dataObj.mensaje,
            // captcha_response:captcha,
            // submittedAt:Date.now(),
            submit:true,
          }
        
      }

      let uri = 'mailer/mailer.php';
      fetch(uri, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then(response => response.json())
      .then(data => {
        if(data.status =='error'){
          alert('Hubo un error con el registro de su información:'+data.message);
        }else{
          alert('Se ha enviado su información correctamente');
        }
      })
      .catch((error) => {
        alert('Hubo un error con el registro de su información');
      });
    }
  }
  window.addEventListener('scroll', function()  {
    let elements = document.getElementsByClassName('scroll-content');
    let screenSize = window.innerHeight;
    
          for(var i = 0; i < elements.length; i++) {
          var element = elements[i];
  
          if(element.getBoundingClientRect().top < screenSize/1.5) {
            element.classList.add('visible');
          } else {
            element.classList.remove('visible');
          }
  
        }
  });