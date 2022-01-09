import React,{useState} from "react";

function Search(props) {

	// for storing types data
    const [state, setstate] = useState(null);

	// QuerySetHandle for different Query for Search
	const changeHandler = e => {
		try {
			props.searchQuery(e.target.value);
		} catch (error) {
			props.searchQuery(e);
		}
	};

	// bringing up types from existing Cards
    let searchType;
    if(props.type){
        searchType = props.type.map(data =>{
            return (data.data.types[0].type.name);
        })
    }

	// Bringinf up unique types from Types
    let UniqueTypes;
	let typeArr =[];
    if(searchType){
        UniqueTypes = new Set(searchType);
		UniqueTypes.forEach(data =>{
			typeArr.push(data)
		})
    }
	
	// rendering list of types
	let list = null;
	if(typeArr.length > 0){
		list = typeArr.map(data =>{
			return  <a onClick={e => changeHandler(data)} class="dropdown-item" href="#">{data}</a>
		})
	}

	const dataRemover=()=>{
		changeHandler('');
	}
	return (
		<div>
			<nav
				class="p-2 navbar navbar-light"
				style={{ backgroundColor: "#e3f2fd" }}
			>
				<div class="container-fluid">
					<a class="navbar-brand">Pokedex</a>
					<form class="d-flex">
						<input
							onChange={e => changeHandler(e)}
							class="form-control me-2"
							type="search"
							placeholder="Search by id or name"
							aria-label="Search"
						></input>
					</form>
				<div class="btn-group">
					<button
						class="btn btn-secondary btn-sm dropdown-toggle"
						type="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						search type
					</button>
					<button onClick={(e) => dataRemover()}>X</button>
					<div class="dropdown-menu">
                    {list ? list : ""}
                    </div>
				</div>
				</div>
			</nav>
		</div>
	);
}

export default Search;
