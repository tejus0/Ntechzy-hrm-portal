import React from 'react'

const Forget = () => {
  return (
    <div>
        <form action="/forget-pass" method="post">
  <input type="email" name="email" placeholder="Enter email" />
  <br /><br />
  <input type="submit" value="Send Reset Link" />
</form>
    </div>
  )
}

export default Forget