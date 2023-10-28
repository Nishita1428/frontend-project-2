
   
    function test() {
        var name = document.getElementById("name ").value;
        var age = document.getElementById("wname ").value;
        var email = document.getElementById("ename ").value;

        

        // alert(name+ age + email );

    var name = localStorage.setItem("name", name);
    var wname = localStorage.setItem("age", age);
    var ename = localStorage.setItem("email", email);

    var name = localStorage.getItem("name", name);
    var wname = localStorage.getItem("age", age);
    var ename = localStorage.getItem("email", email);
    
    window.location.href = "http://127.0.0.1:5501/quiz.html";
    }