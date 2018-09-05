document.addEventListener('DOMContentLoaded', () => {

       
    const form = document.getElementById('registrar');
    const input = form.querySelector('input');
   
    const mainDiv = document.querySelector('.main');
    const ul = document.getElementById('invitedList');
    
    const div = document.createElement('div');
    const filterLabel = document.createElement('label');
    const filterCheckBox = document.createElement('input');




function create (text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label);
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  li.appendChild(editButton);
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  li.appendChild(removeButton);
  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();//done to prevent the submit button fromsending the info in the fields off to the server
  const text = input.value;// take inputs value and store it before we clear the field
  input.value = '';// now lets clear the field
  const li = create(text);//now call the function to creat the <li> element using the text as the inout used in the function
  ul.appendChild(li);//glue itto the <ul> element.
});

ul.addEventListener('change', (e) => {
  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode// Take that specific checkbox's li (remember each li has its own chekcbox) -checkbox's parent was label and lable's parent is li.
    if (checked){//if the specific changed(e.target) checkbox is true
      listItem.className = 'responded'//then, change it's className to responded - which will grant it a specific ruleset to change it's look
    }else {  //or else if it not, then keep it's usual classname- which means nothing new is done to it .
      listItem.className = '';
    }
});


ul.addEventListener('click', (e) => {//add a listener to the ul parent
  if (e.target.tagName === 'BUTTON'){// --now 1st--  if what is clicked has a tag name of 'BUTTON'- recall tagName property returns the tag in an uppercase string.
    const button = e.target;//put that specific button in a var called button
    const li = button.parentNode // take that specific button's <li>, place in a var called li
    const ul = li.parentNode; //that li's parent - the <ul> -- strange because all ul's parents are the ul but lets just see
    if (button.textContent === 'Remove'){// --now 2nd -- AND if that button that is clicked says Remove,
      ul.removeChild(li); // remove that remove buttons parent <li> from the ul - (now i see why the ul)
    }else if (button.textContent === 'Edit'){// NOW if the button reads Edit
      const span = li.firstElementChild; //take that particular <li>'s firstchild which is the actual text that you typed into the <span>(see the create() function)- and place it in a <span> var- rember scope is awesome with const!
      const input = document.createElement('input');// create the input element that will take it's place
      input.type = 'text'; //set it's type to accept text
      input.value = span.textCotent; //take the original content found in the span and place it in the newly made input box - as a prompt convenience for the user
      li.insertBefore(input, span); //move the input before the original span element -- is this step even necessary?
      li.removeChild(span);// then erase the span
      button.textContent = 'Save'// now change the button that was pressed in line 59 to read Save so we can change things newly inputed back into a span.
    }else if (button.textContent == 'Save') {// now if the button pressed reads Save- WHEN then click on it,
      const input = li.firstElementChild; //take the input field which has become the first child since the span was removed
      const span = document.createElement('span');// recreate a span element - that will now hold whatever was typed in the input field
      span.textContent = input.value // put in the span (line 73's),the first elements value which remember was is the input field - this is why using the variable is important rude so you can reuse them
      li.insertBefore(span, input); //the switch aroo just like last time however i dont yet see the need for this StereoPannerNode.
      li.removeChild(input);
      button.textContent = 'Edit'; //now switch whats on the button to say Edit.

    }
 }
});
/*
all we did here is (rember that filterlabel and filterCheckBox were declared in the 
very top with the other variables) provid the label 
some wording and then set the type to the checkbox, then
append the label to the <div> also created in the const section above
and then append the checkbox after that to the <div>
THAN we said to the DOM or the MainDiv holding everything,
hey you put this div of mine befor the ul -- with some
fancy css it looks the way it does and is placed where
it is.  Very simple part and way to add text to the 
DOM without hardcoding it through the HTML.
*/

filterLabel.textContent = "Hide those who haven't yet responded";
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul)

filterCheckBox.addEventListener('change', (e) => {//place  change listener on the checkbox that exist in the outer world/globe
  const isChecked = e.target.checked; //since the e.target is the checkbox- let check if it is true/checked or false/unchecked
  const lis = ul.children; //now we use the children property on the ul to list all the <li>'s that are in existance within the <ul>
    if(isChecked){ // if e.target is checked -- see how we can use variable effectively rude?! yay good for you.
      for(let i = 0; i < lis.length; I++){ //now we are going to cycle through al the li elements in existance- checking for something
        let li = lis[i];//put each <li> and call the specific one we are on just li
        if (li.className === 'responded'){// clever do remember on line 45 - we create a listener that would watch for changes to each <li>'s checkbox and give a class 'responded' if checked -- remember Js  - listens in realtime and  reads in real time.
          li.style.display = '';  //meaning if they did respond and we clicked so, we don nothing - just keep the display as is ''.
        }else {
          li.style.display = 'none'; //now if they didn't respond and responded is not the current class then do not display that <li> of the ul
        }
      }
    }else { // ELSE if e.target on the main e.target checkbox is not checked meaning you dont want to hid those whohavent responded
      for(let i = 0; i < lis.length; I++){ // loop through all the ul children <li>'s
        let li = lis[i];
        li.style.display = ''; // and display them all normally-- Since we are listening to a change in the button - we create order to do something if it is checked and if it is not checked. // 
      }
    }
});



 });
