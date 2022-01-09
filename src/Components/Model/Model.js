import React,{useState} from "react";

function Model(props) {

   let { id ,type, info , Pokename} = props.data;

   let increase;
   let decrease;
   if(info){
       increase = info.affecting_natures.increase.map((inc,i) =>{
        return <h6 key={i} >{inc.name}</h6> 
       })
       decrease = info.affecting_natures.decrease.map((dec,i) =>{
            return <h6 key={i} >{dec.name}</h6> 
        })
   }

	return (
		<div>
			<div
				className="modal fade"
				id="exampleModalCenter"
				tabindex="-1"
				role="dialog"
				aria-labelledby="exampleModalCenterTitle"
				aria-hidden="true"
			>
				<div
					className="modal-dialog modal-dialog-centered"
					role="document"
				>
					<div className="modal-content">
						<div className="modal-header">
							<h5
								className="modal-title"
								id="exampleModalLongTitle"
							>
                            {/* model title */}
								{Pokename} Stats
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
                            {/* model body */}
							<h5>1.Game Index :{info.game_index}</h5>
							<h5>2.Name : {info.name}</h5>
							<h5>3.id : {id}</h5>
							<h5>Type : {type} </h5>
                            <br />
                            <h5>4.Afeetcting natures</h5>
                            Increase : {increase}
                            Decrease  : {decrease}
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Close
							</button>
							<button type="button" className="btn btn-primary">
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Model;
