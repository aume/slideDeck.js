// called from Affect Grid script
function enterDeck() {
    console.log("BANG");
    
	text = document.getElementById('myTextarea').innerHTML ; // get current file name
	deckname = document.getElementById('myDeckName').innerHTML ; // get user identifier

    	
	/* Send the data using post*/
	var $form = $( this ),
		url = $form.attr( 'action' );
        
	$.post('saveDeck.php', {'text':text, 'deckname': deckname},
	  function( data ) {
          return;
	  }
	);
}
