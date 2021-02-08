const Service = require('../model/service')


module.exports = {
    getServicesByCity: async(req,res,next)=>{
        try{
            const {city} = req.body

            //USING AGGREGATION
            const services = await Service.aggregate([
                {"$match": {"cities": {"$elemMatch": {
                    "pincode": city.pincode,
                    "name": city.name
                 }}}}
            ]) 
               
            // const services = await Service.find({cities:{$elemMatch:{pincode: city.pincode}}})
            console.log("services", services)
            if(services.length === 0){
                return res.status(404).json({success: false, message: "No services found in given city", response: []})
            }
            return  res.status(200).json({success:true, message: `${services.length} services found`, response: services})
        }
        catch(err){
            console.log("Error in getSrvicesByCity", err.message)
            return res.status(400).json({ message: `Error in getServicesByCity ${err.message}` })
        }
    },
    addService: async(req,res,next)=>{
        try{
            const {_id, role} = req.user
            if (role !== "admin"){
                return res.status(401).json({message:'Unauthorized'})
            }
            const {serviceName, cities} = req.body
            const service =  await new Service({
                serviceName,
                cities,
                created_by: _id
            })
            await service.save()
            return res.status(201).json({message: "New service created successfully", success: true, response: service})
        }
        catch(err){
            console.log("Error in add service", err.message)
            return res.status(400).json({ message: `Error in addService ${err.message}` })
        }
    },
    removeServie: async(req, res, next)=>{
        try{
            const {role} =  req.user
            if(role !== "admin"){
                return res.status(401).json({message:'Unauthorized'})
            }
            const {serviceId} = req.params
            const service =  await Service.findByIdAndRemove(serviceId)
            if(service){
                return res.status(200).json({success: true, message: "service removed successfully", response: service})
            }
            else{
                return  res.status(404).json({success:false, message: "Service not found"})
            }
        }
        catch(err){
            console.log("Error in remove service", err.message)
            return res.status(400).json({ message: `Error in addService ${err.message}` })
        }
    },
    updateService: async(req, res, next)=>{
        try{
            const {role} =  req.user
            if(role !== "admin"){
                return res.status(401).json({message:'Unauthorized'})
            }
            const {serviceId,cities} = req.body
            if(Array.isArray(cities)){
                const service =  await Service.findById(serviceId, {$set: {cities}})
                if(service){
                    return res.status(200).json({success: true, message: "service removed successfully", response: service})
                }
                else{
                    return  res.status(404).json({success:false, message: "Service not found"})
                }
            }
            else{
                    return  res.status(404).json({success:false, message: "invalid cities"})
            }
        }
        catch(err){
            console.log("Error in remove service", err.message)
            return res.status(400).json({ message: `Error in addService ${err.message}` })
        }
    }

}