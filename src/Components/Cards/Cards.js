import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Model from "../Model/Model";
import Nav from "../Search/Search";

function Cards() {

	//states for data management
	const [searchQuerystate, setSearchQuerystate] = useState(null);
	const [ModelCardstate, setModelCardstate] = useState({
		Pokename: "",
		info: "",
	});
	const [state, setstate] = useState(null);
	const [CurrentStack, setCurrentStack] = useState(
		"https://pokeapi.co/api/v2/pokemon/"
	);
	const [NextStack, setNextStack] = useState(20);

    // setType
    const [Typestate, setTypestate] = useState(null);




	// fetching first 20 data on Page load
	useEffect(() => {
		axios.get(CurrentStack).then(data => {
			return Promise.all(
				data.data.results.map((record, index) => {
					return axios.get(record.url);
				})
			).then(galleries => {
				setstate(galleries);
			});
		});

	}, []);


	// Model card
	const statsShower = (name, url , id ) => {
		axios.get(url.data.stats[1].stat.url).then(items => {
			setModelCardstate({
				type: url.data.types[0].type.name,
				Pokename: name,
				info: items.data,
				id : id,
			});
		});
	};

	//rendering list of cards fetched as default
	let card;
	if (state) {
		card = state.map((data, i) => {
			return (
				<div key={i} className="col">
					<div className="card shadow-sm p-2">
						{data.data.id ? (
							<img
								width="100%"
								height="125"
								src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.data.id}.svg`}
								alt=""
							/>
						) : (
							"loading.."
						)}

						<div className="card-body">
							<h4 className="card-text">
								{data.data.name} ,<h5>id : {data.data.id}</h5>
								<h5>type : {data.data.types[0].type.name}</h5>
							</h4>
							<p
								onClick={() =>
									statsShower(data.data.name, data , data.data.id)
								}
								className="card-text text-muted fs-10"
							>
								<button
									type="button"
									className="btn btn-primary"
									data-toggle="modal"
									data-target="#exampleModalCenter"
								>
									View Stats
								</button>
							</p>
						</div>
					</div>
				</div>
			);
		});
	}

	// Next 20 Cards
	const nextSlider = () => {
		if (NextStack <= 0) {
			axios.get(CurrentStack).then(data => {
				setstate(data.data.results);
			});
		} else {
			axios
				.get(
					`https://pokeapi.co/api/v2/pokemon/?offset=${NextStack}&limit=20`
				)
				.then(data => {
					return Promise.all(
                        data.data.results.map((record, index) => {
                            return axios.get(record.url);
                        })
                    ).then(galleries => {
                        setstate(galleries);
                    });
				});
		}
		setNextStack(NextStack + 20);
	};

	// previous 20 cards
	const prevSlider = () => {
		setNextStack(NextStack - 20);
		axios
			.get(
				`https://pokeapi.co/api/v2/pokemon/?offset=${
					NextStack - 40
				}&limit=20`
			)
			.then(data => {
				return Promise.all(
                    data.data.results.map((record, index) => {
                        return axios.get(record.url);
                    })
                ).then(galleries => {
                    setstate(galleries);
                });
			});
	};

	//SearchQuery
	const searchQuery = query => {
		setSearchQuerystate(query);
	};

    // checking where does the searchQuey lies
	let onsearch = null;
	if(searchQuerystate){
	    onsearch =  state.map((data,i)=>{
	        if( (data.data["id"] == searchQuerystate) || (data.data["name"].includes(searchQuerystate)) || (data.data.types[0].type.name == searchQuerystate)){
	            return data
	        }
	    })
	}

    //removing undefined elements
	let act = null;
	if(onsearch){
		act = (onsearch.filter(e => typeof e !== 'undefined'));
	}

    //showing the found elements on the basis of search
	if (act){
		card = act.map((data, i) => {
			return (
				<div key={i} className="col">
					<div className="card shadow-sm p-2">
						{data.data.id ? (
							<img
								width="100%"
								height="125"
								src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.data.id}.svg`}
								alt=""
							/>
						) : (
							"loading.."
						)}

						<div className="card-body">
							<h4 className="card-text">
								{data.data.name} ,<h5>id : {data.data.id}</h5>
								<h5>type : {data.data.types[0].type.name}</h5>
							</h4>
							<p
								onClick={() =>
									statsShower(data.data.name, data , data.data.id )
								}
								className="card-text text-muted fs-10"
							>
								<button
									type="button"
									className="btn btn-primary"
									data-toggle="modal"
									data-target="#exampleModalCenter"
								>
									View Stats
								</button>
							</p>
						</div>
					</div>
				</div>
			);
		});
	}


	return (
		<div>
			<Nav searchQuery={searchQuery} type ={state} />
			<div className="album py-5 bg-light">
				<div className="container">
					<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
						{card}
					</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{NextStack > 21 ? (
					<button
						onClick={() => prevSlider()}
						className="btn btn-primary"
					>
						{" "}
						previous 20
					</button>
				) : (
					""
				)}
				<button
					onClick={() => nextSlider()}
					className="btn btn-primary"
				>
					next 20
				</button>
			</div>
			<Model data={ModelCardstate} />
		</div>
	);
}

export default Cards;
