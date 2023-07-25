import React from "react";
import {Checkbox} from "../../webcomponent";

function Signup2({formData, setFormData,validateFormData, categories, setCategories}) {
    return (
    <div className="Signup4">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Enterprice Investor</h3>                                
        <p className="text-main-purple">
        Tell us more about your business
        </p>

        <div className="mt-6">
            <div className="row">
                {/* Label */}
                <div className="w-full">
                    <label htmlFor="category" className="text-main-gray block mb-2 text-[14px]">
                        What category describes your business or product? (Select one or more)
                        <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="flex flex-cols gap-2">
                        <div className="row parent w-full">
                        <Checkbox 
                                label="Food & Beverage" 
                                name="Food & Beverage" 
                                checked={categories.food} 
                                onChange={(event)=>
                                    setCategories({...categories, food: event.target.checked})
                                }
                        />
                        <Checkbox 
                                label="Technology"
                                name="Technology"
                                checked={categories.technology}
                                onChange={(event)=>
                                    setCategories({...categories, technology: event.target.checked})
                                }
                        />
                        <Checkbox
                                label="App / Website"
                                name="App / Website"
                                checked={categories.app}
                                onChange={(event)=>
                                    setCategories({...categories, app: event.target.checked})
                                }
                        />
                        </div>
                    </div>
                    <div className="flex flex-cols gap-2">
                        <div className="row parent w-full">
                        <Checkbox
                                label="Fitness"
                                name="Fitness"
                                checked={categories.fitness}
                                onChange={(event)=>
                                    setCategories({...categories, fitness: event.target.checked})
                                }
                                
                        />
                        <Checkbox 
                                label="Health / Wellness / Nutrition"
                                name="Health / Wellness / Nutrition"
                                checked={categories.healthcare}
                                onChange={(event)=>
                                    setCategories({...categories, healthcare: event.target.checked})
                                }
                        />
                        <Checkbox 

                                label="Sports"
                                name="Sports"
                                checked={categories.sports}
                                onChange={(event)=>
                                    setCategories({...categories, sports: event.target.checked})
                                }
                        />
                        </div>
                    </div>
                    <div className="flex flex-cols gap-2">
                        <div className="row parent w-full">
                        <Checkbox 
                                label="Beauty"
                                name="Beauty"
                                checked={categories.beauty}
                                onChange={(event)=>
                                    setCategories({...categories, beauty: event.target.checked})
                                }
                        />
                        <Checkbox 
                                label="Clothing / Fashion"
                                name="Clothing / Fashion"
                                checked={categories.clothing}
                                onChange={(event)=>
                                    setCategories({...categories, clothing: event.target.checked})
                                }
                        />
                        <Checkbox 
                                label="Toys / Games"
                                name="Toys / Games"
                                checked={categories.toys}
                                onChange={(event)=>
                                    setCategories({...categories, toys: event.target.checked})
                                }
                        />
                        </div>
                    </div>
                    <div className="flex flex-cols gap-2">
                        <div className="row parent w-full">
                        <Checkbox 
                                label="Entertainment / Experiential"
                                name="Entertainment / Experiential"
                                checked={categories.entertainment}
                                onChange={(event)=>
                                    setCategories({...categories, entertainment: event.target.checked})
                                }
                        />
                        <Checkbox 
                                label="Pets"
                                name="Pets"
                                checked={categories.pets}
                                onChange={(event)=>
                                    setCategories({...categories, pets: event.target.checked})
                                }
                        />
                        <Checkbox 
                                label="Music"
                                name="Music"
                                checked={categories.music}
                                onChange={(event)=>
                                    setCategories({...categories, music: event.target.checked})
                                }
                        />
                        </div>
                    </div>
                    <div className="flex flex-cols gap-2">
                        <div className="row parent w-full">
                        <Checkbox 
                                label="Holiday"
                                name="Holiday"
                                checked={categories.holiday}
                                onChange={(event)=>
                                    setCategories({...categories, holiday: event.target.checked})
                                }
                        />
                        <Checkbox 
                                label="Children"
                                name="Children"
                                checked={categories.children}
                                onChange={(event)=>
                                    setCategories({...categories, children: event.target.checked})
                                }
                        />
                        <Checkbox
                                label="Housewares / Home Design"
                                name="Housewares / Home Design"
                                checked={categories.housewares}
                                onChange={(event)=>
                                    setCategories({...categories, housewares: event.target.checked})
                                }
                        />
                        </div>
                    </div>
                </div>
            </div>                         
        </div>

    </div>    
    );
}
export default Signup2;