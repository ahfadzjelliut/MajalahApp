import React from "react";

class SearchItemNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cari:""
        };

        this.OnCariInput = this.OnCariInput.bind(this);
        this.OnSubmitTukangTerus = this.OnSubmitTukangTerus.bind(this);
    }
    OnCariInput(e) {
        const value = e.target.value;
        this.setState({ cari: value });
        this.props.pencarian(value);
    }

    OnSubmitTukangTerus(e){
        e.preventDefault();
        this.props.pencarian(this.state.cari);
    }


    render(){
        return(
            <form onSubmit={this.OnSubmitTukangTerus} className="m-5 max-w-md mx-auto">
                <label htmlFor="cariin" className="mb-2 text-sm font-medium text-gray-300 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-7 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                
                <input type="text" id="cariin" value={this.state.cari} className="block w-full p-4 ps-10 text-sm text-gray-700 border border-gray-300 
                rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="cari" onChange={this.OnCariInput} />
                </div>
            </form>
        )
    }
}

export default SearchItemNavbar;