const makeNode
  = data =>
    left =>
      right =>
        ( {
          data,
          left,
          right,
        } );
const insert
  = currentNode => {

    if ( !currentNode ) {

      return makeNode;

    }
    return data => {

      if ( data < currentNode.data ) {

        return makeTree( makeNode( currentNode.data )( insert( currentNode.left )( data ) )( currentNode.right ) );

      }
      return makeTree( makeNode( currentNode.data )( currentNode.left )( insert( currentNode.right )( data ) ) );

    };

  };
const makeTree
  = root => {

    if ( !root ) {

      return null;

    }
    return {
      insert: insert( root ),
      root,
      search: search( root ),
    };

  };
