import React from 'react'

const Message = () => {
  return (
    <div className='chat-end'>
        <div className='chat-imge avatar'>
            <div className='w-10 rounded-full'>
                <img
                    alt='avatar'
                    src={
                        "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
                    }
                />
            </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500`}>Hola como estas?</div>
       < div className='cchat-footer opacity-50 text-xs flex gap-1 items-center'>12:34</div>
    </div>
  )
}

export default Message