const asyncHandler = require('express-async-handler')
const Contact=require('../model/contactModel')


//desc get all contacts
//route get /api/contacts
//acesss  private

const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
});

//desc get contact  
//route get /api/contacts/:id
//acesss  private

const getContact=asyncHandler( async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
});

//desc create new contacts
//route post /api/contacts
//acesss  private

const createContact=asyncHandler( async(req,res)=>{
    console.log("The request body is",req.body)
    const {name,email,phone}=req.body;

    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,email,phone,user_id: req.user.id
    })
    res.status(201).json(contact);
});

//desc update contacts
//route put /api/contacts/:id
//acesss private

const updateContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error('User cannot update other user contacts ')
    }
    const updateContacts=await Contact.findById(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updateContacts)
});

//desc delete contacts
//route delete /api/contacts/:id
//acesss  private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error('User cannot delete other user contacts ')
    }
    await contact.deleteOne({_id:req.params.id}); // This deletes the contact instance
    res.status(200).json({ message: 'Contact deleted successfully' });
});

module.exports={getContact,getContacts,createContact,deleteContact,updateContact};