import React, { Component } from 'react';
import {Search} from '../api/cab230-hackhouse'

class OffenceSelection extends Component {
    // setuips dropdowns for offences
    handleSubmitSer = async (offence, e) => {
        let result = await Search(offence)
        this.props.onSubmitSeachF(result)
      }

    getResults = (e) => {
        e.preventDefault()
        let finalSearchString = "";
        let OffenceF = document.getElementById("OffenceFilter").value;
        let AreaF = document.getElementById("AreaFilter").value;
        let AgeF = document.getElementById("AgeFilter").value;
        let GenderF = document.getElementById("GenderFilter").value;
        let YearF = document.getElementById("YearFilter").value;
        
        finalSearchString += "offence=" + OffenceF
        if (AreaF !== "") {
            finalSearchString += "&area=" + AreaF; 
        }
        if (AgeF !== "") {
            finalSearchString += "&age=" + AgeF;
        }
        if (GenderF !== "") {
            finalSearchString += "&gender=" + GenderF;
        }
        if (YearF !== "") {
            finalSearchString += "&year=" + YearF;
        }
        if (finalSearchString !== "") {
            this.handleSubmitSer(finalSearchString)
        }
        finalSearchString = ""
    }
    
    render() {
        return (
            <div>
            <h3>Select your filters here:</h3>
            <label>Offence: </label>
                <select id="OffenceFilter">
                    {this.props.propfromparent.offence.offences.map(NewOffence => (
                        <option key={NewOffence}>
                            {NewOffence}
                        </option>
                    ))}
                </select>
                <label> Area: </label>
                <select id="AreaFilter">
                    <option value=""></option>
                        {this.props.propfromparent.area.areas.map(NewAreas => (
                            <option key={NewAreas}>
                                {NewAreas}
                            </option>
                    ))}
                </select>
                <label> Age: </label>
            <select id="AgeFilter">
                <option value=""></option>
                    {this.props.propfromparent.age.ages.map(NewAges => (
                        <option key={NewAges}>
                            {NewAges}
                        </option>
                ))}
            </select>
            <label> Gender: </label>
                <select id="GenderFilter">
                    <option value=""></option>
                    {this.props.propfromparent.gender.genders.map(NewGender => (
                        <option key={NewGender}>
                            {NewGender}
                        </option>
                    ))}
                </select>
                <label> Year: </label>
                <select id="YearFilter">
                    <option value=""></option>
                    {this.props.propfromparent.year.years.map(NewYear => (
                        <option key={NewYear}>
                            {NewYear}
                        </option>
                    ))}
                </select>
                <button onClick={this.getResults}>Select</button>
                </div>
        )
    }

}

export default OffenceSelection;