const Dog = require("../models/dogModel.js");
const errorHandler = require("../middlewares/errorHandler.js");

const commonErrors = require("../middlewares/commonErrors.js");

const memoService = {
  // 추가
  async createMemo(dogId, memoData, currentUserId) {
    const dog = await Dog.findById(dogId);
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        "해당 사용자에게 권한이 없습니다.",
        { statusCode: 403 }
      );
    }
    dog.memos.push(memoData);
    const updatedDog = await dog.save();
    return updatedDog.memos[updatedDog.memos.length - 1]; // return the newly added memo
  },

  // 무한스크롤구현
  async getMemoById(dogId, currentUserId, cursor, pageSize = 3) {
    const dog = await Dog.findById(dogId).sort({ createdAt: -1 }).exec();
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        "해당 사용자에게 권한이 없습니다.",
        { statusCode: 403 }
      );
    }
    let memo = dog.memos;
    if (cursor) {
      memo = memo.filter((item) => new Date(item.date) < new Date(cursor));
    }

    // 내림차순 정렬
    memo.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!memo) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        "해당 데이터를 찾을수없습니다.",
        { statusCode: 404 }
      );
    }
    // 페이징 처리
    let startIndex = 0;
    if (cursor) {
      // 현재 페이지의 시작 인덱스를 찾아내기
      startIndex = memo.findIndex(
        (item) => new Date(item.date) <= new Date(cursor)
      );
      if (startIndex === -1) {
        // 커서의 날짜보다 이전 데이터가 없을 경우 처음부터 반환
        return null;
      }
    }
    const endIndex = startIndex + pageSize;
    const slicedmemo = memo.slice(startIndex, endIndex);

    return slicedmemo;
  },
  // 가져오기 3개
  async getMemo3ById(dogId, currentUserId) {
    const dog = await Dog.findById(dogId).sort({ createdAt: -1 }).exec();
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        "해당 사용자에게 권한이 없습니다.",
        { statusCode: 403 }
      );
    }
    const memo = dog.memos
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
    if (!memo) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        "해당 데이터를 찾을수없습니다.",
        { statusCode: 404 }
      );
    }
    return memo;
  },
  // 업데이트
  async updateMemo(dogId, memoId, updatedMemoData, currentUserId) {
    const dog = await Dog.findById(dogId);
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        "해당 사용자에게 권한이 없습니다.",
        { statusCode: 403 }
      );
    }
    const memo = dog.memos.id(memoId);

    if (!memo) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        "해당 데이터를 찾을수없습니다.",
        { statusCode: 404 }
      );
    }

    memo.set(updatedMemoData);
    const updatedMemo = await dog.save();
    return updatedMemo.memos.id(memoId);
  },

  // 삭제
  async deleteMemo(dogId, memoId, currentUserId) {
    const dog = await Dog.findById(dogId);
    if (dog.userId !== currentUserId) {
      throw new errorHandler(
        commonErrors.authorizationError,
        "해당 사용자에게 권한이 없습니다.",
        { statusCode: 403 }
      );
    }
    const memoIndex = dog.memos.findIndex((w) => w._id.toString() === memoId);

    if (memoIndex === -1) {
      throw new errorHandler(
        commonErrors.resourceNotFoundError,
        "해당 데이터를 찾을수없습니다.",
        { statusCode: 404 }
      );
    }

    dog.memos.splice(memoIndex, 1);
    const updatedDog = await dog.save();

    return updatedDog;
  },
};

module.exports = memoService;
