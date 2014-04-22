var LinkedList = function(node) {
  this.head = node;
  this.tail = node;
  this.count = 1;
};

var Node = function(name, val, time) {
  this.name = name;
  this.val = val;
  this.time = time;
  this.pre = null;
  this.next = null;
};

function append(list, node) {
  node.pre = list.tail; // update node.pre
  list.tail.next = node; // update list.tail.next
  list.tail = node; // point tail to node
  list.count += 1;
}

function enumerate(list) {
  var current = list.head;
  var arr = [];
  arr.push(current.val); // options: name, val, time
  
  while (current.next !== null) {
    current = current.next;
    arr.push(current.val); // options: name, val, time
  }
  
  return arr;
}

var node1 = new Node("init", 0, 0);
var list = new LinkedList(node1);
console.log(list);
console.log(enumerate(list));


// Main script
jQuery(document).ready(function($) {
  var person, prePerson;
  
  // Select Person
  person = $('button.person').text().trim();
  $('li.person').on('click', function(e){
    e.preventDefault();
    person = $(this).text().trim();
    prePerson = $('button.person').text();
    $(this).html("<a href='#'>"+prePerson+"</a>");
    $('button.person').html(person+" <span class='caret'></span>");
  });
  $('button.person').on('click', function(e){
    e.preventDefault();
    person = $(this).text().trim();
  });
  
  // On text input enter
  $('input.chatInput').keypress(function(event){
    if(event.keyCode === 13) {
      keyDownFlag = 1;
      var time, timeStr, sec, text;
      
      // Set time string
      time = new Date($.now());
      if(time.getSeconds()<10){
        sec = "0"+time.getSeconds();
      } else {
        sec = time.getSeconds();
      }
      timeStr = time.getHours()+": "+time.getMinutes()+":"+sec+" "+(time.getMonth()+1)+"/"+time.getDate()+"/"+time.getFullYear();
      
      // Prepend chat content
      text = $('input.chatInput').val();
      $('div.chatContent').append("<p>"+person+" says: "+text+" <span class='time'>"+timeStr+"</span></p>");
      $('input.chatInput').val('');
      
      // Append chat content as a node to the list
      append(list, new Node(person, text, timeStr));
      console.log(enumerate(list));
      
      $("div.jumbotron").scrollTop($('div.chatContent').height());
      $('div.chatContent p').last().animate({opacity: 1}, 500);
    }
  }); 
});