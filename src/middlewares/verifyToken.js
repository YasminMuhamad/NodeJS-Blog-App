// middlewares/verifyToken.js
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    console.log('🔐 === TOKEN VERIFICATION START ===');
    
    const authHeader = req.headers['authorization'];
    console.log('📨 Full Authorization Header:', authHeader);

    if (!authHeader) {
      console.log('❌ No authorization header');
      return res.status(401).json({ message: 'Access token required' });
    }

    // استخراج الـ token
    let token;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
      console.log('🔧 Extracted token (after Bearer):', token);
    } else {
      token = authHeader;
      console.log('🔧 Using raw token (without Bearer):', token);
    }

    if (!token) {
      console.log('❌ No token found after extraction');
      return res.status(401).json({ message: 'Access token required' });
    }

    console.log('🔑 Token length:', token.length);
    console.log('🔑 Full token string:', `"${token}"`);

    // فحص إذا الـ token فيه مشاكل
    if (token === 'undefined' || token === 'null' || token === '') {
      console.log('❌ Token is empty or undefined');
      return res.status(401).json({ message: 'Token is empty' });
    }

    // جرب نفك الـ token بدون verify أول
    try {
      const decodedWithoutVerify = jwt.decode(token);
      console.log('🔍 Decoded without verification:', decodedWithoutVerify);
      
      if (!decodedWithoutVerify) {
        console.log('❌ Token cannot be decoded - likely malformed');
        return res.status(403).json({ message: 'Token is malformed' });
      }
    } catch (decodeError) {
      console.log('❌ Error in decoding:', decodeError.message);
    }

    // فحص الـ token
    jwt.verify(token, "super_secret_key", (err, user) => {
      if (err) {
        console.log('❌ JWT Verify Error:', err.message);
        console.log('❌ Error name:', err.name);
        
        return res.status(403).json({ message: 'Invalid token - ' + err.message });
      }
      
      console.log('✅ Token decoded successfully:', user);
      
      // Check if user.id and user.role exist in the token payload
      if (!user.id || !user.role) {
        console.log('❌ Missing id or role in token payload');
        return res.status(403).json({ message: 'Invalid token payload' });
      }
      
      // Attach user information to the request object
      req.user = {
        id: user.id,
        userId: user.id, // For compatibility
        role: user.role
      };
      
      console.log('✅ Authentication successful - User ID:', req.user.id);
      console.log('✅ === TOKEN VERIFICATION END ===');
      next();
    });
  } catch (error) {
    console.error('💥 Auth middleware unexpected error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default verifyToken;