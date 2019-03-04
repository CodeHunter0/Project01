var arrNotes = [];
$( document ).ready(function() {
    arrNotes = JSON.parse(localStorage.getItem("arrNotes") || "[]");
    setAllNotesOnScreen();
});

function addNewNote(){
   var dateinput = document.querySelector("#example-datetime-local-input");
   if (dateinput.value=="") {
       alert("You need to add your date first");
       return;
    } else {
    var newNoteText,newNoteDate, newNoteTime;
    newNoteText = $('textarea#txtNote').val().replace(/\n/g, "<br />");
    newNoteDate = formatDate((new Date($('#example-datetime-local-input').val())));
    newNoteTime = (new Date($('#example-datetime-local-input').val())).toLocaleTimeString();
    var note = {'text': newNoteText, 'time' : newNoteTime, 'date' : newNoteDate};

    addNoteToLocalStorage(note);

    setAllNotesOnScreen();
}}

function addNoteToLocalStorage(note){
    if (typeof(Storage) !== "undefined") {
        arrNotes.push(note);
        localStorage.setItem("arrNotes", JSON.stringify(arrNotes));

      } else {
        console.log("Your browser does not support Web Storage...");
      }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function removeNote(id){
    arrNotes.splice(id,1);
    localStorage.setItem("arrNotes", JSON.stringify(arrNotes));
    setAllNotesOnScreen();

}
function setAllNotesOnScreen(){
    $("#notesContainer").html('');
    for (var i in arrNotes){
        $("#notesContainer").append("<div class='card bgnote' style='width: 18rem;'>" +
                                        "<button type='button' onclick='removeNote("+i+")' class='close rightText' aria-label='Close'>" +
                                            "<span aria-hidden='true'>&times;</span>" +
                                        "</button>"+
                                        "<div class='card-body'>"+
                                            "<p class='card-text'>"+arrNotes[i].text+ "</p>" +
                                            "<div>"+arrNotes[i].time+"</div>" +
                                            "<div>"+arrNotes[i].date+"</div>" +
                                        "</div>"+
                                    "</div>");
    }
    
}